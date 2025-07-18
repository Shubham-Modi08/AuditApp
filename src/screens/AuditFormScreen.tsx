import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import {
  launchImageLibrary,
  type ImagePickerResponse,
} from 'react-native-image-picker';
import { useAudit } from '../context/AuditContext';
import { useRole } from '../context/RoleContext';

const AuditFormScreen = ({ navigation }: any) => {
  const { currentAudit, updateCurrentAudit, addAudit, clearCurrentAudit } =
    useAudit();
  const { userRole } = useRole();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  // Form state
  const [title, setTitle] = useState(currentAudit.title || '');
  const [department, setDepartment] = useState(currentAudit.department || '');
  const [auditDate, setAuditDate] = useState(currentAudit.auditDate || '');
  const [overallRating, setOverallRating] = useState(
    currentAudit.overallRating || 3,
  );
  const [complianceChecks, setComplianceChecks] = useState(
    currentAudit.complianceChecks || {
      documentation: false,
      procedures: false,
      training: false,
      equipment: false,
    },
  );
  const [findings, setFindings] = useState(currentAudit.findings || '');
  const [recommendations, setRecommendations] = useState(
    currentAudit.recommendations || '',
  );
  const [images, setImages] = useState<string[]>(currentAudit.images || []);

  useEffect(() => {
    // Save current progress to context
    updateCurrentAudit({
      title,
      department,
      auditDate,
      overallRating,
      complianceChecks,
      findings,
      recommendations,
      images,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    title,
    department,
    auditDate,
    overallRating,
    complianceChecks,
    findings,
    recommendations,
    images,
  ]);

  const handleImagePicker = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
        maxWidth: 800,
        maxHeight: 600,
      },
      (response: ImagePickerResponse) => {
        if (response.assets && response.assets[0]) {
          const imageUri = response.assets[0].uri;
          if (imageUri) {
            setImages(prev => [...prev, imageUri]);
          }
        }
      },
    );
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return title.trim() && department.trim() && auditDate.trim();
      case 2:
        return overallRating >= 1 && overallRating <= 5;
      case 3:
        return findings.trim() && recommendations.trim();
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) {
      Alert.alert('Validation Error', 'Please fill in all required fields');
      return;
    }
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (!validateStep(currentStep)) {
      Alert.alert('Validation Error', 'Please fill in all required fields');
      return;
    }

    const newAudit = {
      id: Date.now().toString(),
      title,
      department,
      auditDate,
      overallRating,
      complianceChecks,
      findings,
      recommendations,
      images,
      submittedBy: userRole || 'Unknown',
      submittedAt: new Date().toISOString(),
      status: 'Submitted' as const,
    };

    addAudit(newAudit);
    clearCurrentAudit();

    navigation.reset({
      index: 0,
      routes: [
        { name: 'Main' },
        { name: 'AuditSummary', params: { auditId: newAudit.id } },
      ],
    });
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {Array.from({ length: totalSteps }, (_, index) => (
        <View
          key={index}
          style={[
            styles.stepDot,
            index + 1 <= currentStep && styles.stepDotActive,
          ]}
        />
      ))}
    </View>
  );

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Step 1: Basic Information</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Audit Title *</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter audit title"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Department *</Text>
        <TextInput
          style={styles.input}
          value={department}
          onChangeText={setDepartment}
          placeholder="Enter department name"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Audit Date *</Text>
        <TextInput
          style={styles.input}
          value={auditDate}
          onChangeText={setAuditDate}
          placeholder="YYYY-MM-DD"
        />
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Step 2: Assessment & Compliance</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Overall Rating (1-5) *</Text>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map(rating => (
            <TouchableOpacity
              key={rating}
              style={[
                styles.ratingButton,
                overallRating === rating && styles.ratingButtonActive,
              ]}
              onPress={() => setOverallRating(rating)}
            >
              <Text
                style={[
                  styles.ratingText,
                  overallRating === rating && styles.ratingTextActive,
                ]}
              >
                {rating}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Compliance Checks</Text>
        {Object.entries(complianceChecks).map(([key, value]) => (
          <TouchableOpacity
            key={key}
            style={styles.checkboxContainer}
            onPress={() =>
              setComplianceChecks(prev => ({ ...prev, [key]: !value }))
            }
          >
            <View style={[styles.checkbox, value && styles.checkboxChecked]}>
              {value && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Step 3: Findings & Documentation</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Key Findings *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={findings}
          onChangeText={setFindings}
          placeholder="Describe key findings from the audit"
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Recommendations *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={recommendations}
          onChangeText={setRecommendations}
          placeholder="Provide recommendations for improvement"
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Supporting Images</Text>
        <TouchableOpacity
          style={styles.imageButton}
          onPress={handleImagePicker}
        >
          <Text style={styles.imageButtonText}>+ Add Image</Text>
        </TouchableOpacity>

        {images.length > 0 && (
          <View style={styles.imageList}>
            {images.map((image, index) => (
              <View key={index} style={styles.imageItem}>
                <Text style={styles.imageName}>Image {index + 1}</Text>
                <TouchableOpacity
                  style={styles.removeImageButton}
                  onPress={() => removeImage(index)}
                >
                  <Text style={styles.removeImageText}>Remove</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {renderStepIndicator()}

        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
      </ScrollView>

      <View style={styles.navigationContainer}>
        {currentStep > 1 && (
          <TouchableOpacity style={styles.navButton} onPress={handlePrevious}>
            <Text style={styles.navButtonText}>Previous</Text>
          </TouchableOpacity>
        )}

        <View style={styles.navSpacer} />

        {currentStep < totalSteps ? (
          <TouchableOpacity
            style={styles.navButtonPrimary}
            onPress={handleNext}
          >
            <Text style={styles.navButtonPrimaryText}>Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit Audit</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  stepDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#e2e8f0',
    marginHorizontal: 6,
  },
  stepDotActive: {
    backgroundColor: '#2563eb',
  },
  stepContainer: {
    padding: 20,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ratingButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#d1d5db',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  ratingButtonActive: {
    borderColor: '#2563eb',
    backgroundColor: '#2563eb',
  },
  ratingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
  },
  ratingTextActive: {
    color: '#fff',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#374151',
  },
  imageButton: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  imageButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  imageList: {
    marginTop: 8,
  },
  imageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  imageName: {
    fontSize: 14,
    color: '#374151',
  },
  removeImageButton: {
    backgroundColor: '#dc2626',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  removeImageText: {
    color: '#fff',
    fontSize: 12,
  },
  navigationContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  navButton: {
    backgroundColor: '#6b7280',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  navSpacer: {
    flex: 1,
  },
  navButtonPrimary: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  navButtonPrimaryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#16a34a',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AuditFormScreen;
