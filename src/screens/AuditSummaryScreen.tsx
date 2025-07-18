import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useAudit } from '../context/AuditContext';

const AuditSummaryScreen = ({ navigation, route }: any) => {
  const { auditId } = route.params;
  const { getAuditById } = useAudit();

  const audit = getAuditById(auditId);

  if (!audit) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Audit not found</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return '#16a34a';
    if (rating >= 3) return '#f59e0b';
    return '#dc2626';
  };

  const getComplianceCount = () => {
    return Object.values(audit.complianceChecks).filter(Boolean).length;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.successTitle}>
            ✅ Audit Submitted Successfully!
          </Text>
          <Text style={styles.successSubtitle}>
            Your audit has been recorded and is now available in the audit
            history.
          </Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.cardTitle}>Audit Summary</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Title:</Text>
            <Text style={styles.summaryValue}>{audit.title}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Department:</Text>
            <Text style={styles.summaryValue}>{audit.department}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Audit Date:</Text>
            <Text style={styles.summaryValue}>
              {new Date(audit.auditDate).toLocaleDateString()}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Overall Rating:</Text>
            <Text
              style={[
                styles.summaryValue,
                styles.ratingValue,
                { color: getRatingColor(audit.overallRating) },
              ]}
            >
              {audit.overallRating}/5
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Compliance Score:</Text>
            <Text style={styles.summaryValue}>
              {getComplianceCount()}/4 checks passed
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Submitted By:</Text>
            <Text style={styles.summaryValue}>{audit.submittedBy}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Submission Time:</Text>
            <Text style={styles.summaryValue}>
              {new Date(audit.submittedAt).toLocaleString()}
            </Text>
          </View>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.cardTitle}>Compliance Checks</Text>
          {Object.entries(audit.complianceChecks).map(([key, value]) => (
            <View key={key} style={styles.complianceRow}>
              <Text style={value ? styles.checkPassed : styles.checkFailed}>
                {value ? '✅' : '❌'}
              </Text>
              <Text style={styles.complianceLabel}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.cardTitle}>Key Findings</Text>
          <Text style={styles.findingsText}>{audit.findings}</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.cardTitle}>Recommendations</Text>
          <Text style={styles.recommendationsText}>
            {audit.recommendations}
          </Text>
        </View>

        {audit.images.length > 0 && (
          <View style={styles.summaryCard}>
            <Text style={styles.cardTitle}>Supporting Images</Text>
            <Text style={styles.imageCount}>
              {audit.images.length} image(s) attached
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() =>
            navigation.navigate('Main', { screen: 'AuditHistory' })
          }
        >
          <Text style={styles.primaryButtonText}>View All Audits</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('AuditForm')}
        >
          <Text style={styles.secondaryButtonText}>Create New Audit</Text>
        </TouchableOpacity>
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
  header: {
    backgroundColor: '#16a34a',
    padding: 20,
    alignItems: 'center',
  },
  successTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 14,
    color: '#dcfce7',
    textAlign: 'center',
  },
  summaryCard: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingBottom: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 14,
    color: '#1e293b',
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  ratingValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  complianceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkPassed: {
    marginRight: 12,
    fontSize: 16,
  },
  checkFailed: {
    marginRight: 12,
    fontSize: 16,
  },
  complianceLabel: {
    fontSize: 14,
    color: '#374151',
  },
  findingsText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  recommendationsText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  imageCount: {
    fontSize: 14,
    color: '#64748b',
    fontStyle: 'italic',
  },
  actionContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  primaryButton: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#f1f5f9',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  secondaryButtonText: {
    color: '#2563eb',
    fontSize: 16,
    fontWeight: '600',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#dc2626',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default AuditSummaryScreen;
