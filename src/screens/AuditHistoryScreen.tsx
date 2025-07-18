import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useAudit, type AuditData } from '../context/AuditContext';
import { useRole } from '../context/RoleContext';

const AuditHistoryScreen = ({ navigation }: any) => {
  const { audits, deleteAudit } = useAudit();
  const { userRole } = useRole();

  const handleCreateAudit = () => {
    if (userRole === 'Viewer') {
      Alert.alert('Access Denied', 'Viewers cannot create new audits');
      return;
    }
    navigation.navigate('AuditForm');
  };

  const handleDeleteAudit = (id: string, title: string) => {
    if (userRole !== 'Admin') {
      Alert.alert('Access Denied', 'Only Admins can delete audits');
      return;
    }

    Alert.alert('Delete Audit', `Are you sure you want to delete "${title}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteAudit(id),
      },
    ]);
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return '#16a34a';
    if (rating >= 3) return '#f59e0b';
    return '#dc2626';
  };

  const renderAuditItem = ({ item }: { item: AuditData }) => (
    <View style={styles.auditCard}>
      <View style={styles.auditHeader}>
        <Text style={styles.auditTitle}>{item.title}</Text>
        {userRole === 'Admin' && (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteAudit(item.id, item.title)}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.auditDetails}>
        <Text style={styles.auditDepartment}>{item.department}</Text>
        <Text style={styles.auditDate}>
          Audit Date: {new Date(item.auditDate).toLocaleDateString()}
        </Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingLabel}>Overall Rating: </Text>
          <Text
            style={[
              styles.ratingValue,
              { color: getRatingColor(item.overallRating) },
            ]}
          >
            {item.overallRating}/5
          </Text>
        </View>
        <Text style={styles.submittedInfo}>
          Submitted by {item.submittedBy} on{' '}
          {new Date(item.submittedAt).toLocaleString()}
        </Text>
      </View>

      <View style={styles.findingsPreview}>
        <Text style={styles.findingsLabel}>Key Findings:</Text>
        <Text style={styles.findingsText} numberOfLines={2}>
          {item.findings || 'No findings recorded'}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Audit History ({audits.length} audits)
        </Text>
        <Text style={styles.roleIndicator}>Role: {userRole}</Text>
      </View>

      {userRole !== 'Viewer' && (
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateAudit}
        >
          <Text style={styles.createButtonText}>+ New Audit</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={audits}
        renderItem={renderAuditItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No audits found</Text>
            {userRole !== 'Viewer' && (
              <Text style={styles.emptySubtext}>
                Tap "New Audit" to create your first audit
              </Text>
            )}
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  roleIndicator: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  createButton: {
    backgroundColor: '#2563eb',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  listContainer: {
    padding: 16,
  },
  auditCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  auditHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  auditTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    flex: 1,
    marginRight: 12,
  },
  deleteButton: {
    backgroundColor: '#dc2626',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  auditDetails: {
    marginBottom: 12,
  },
  auditDepartment: {
    fontSize: 16,
    color: '#2563eb',
    fontWeight: '500',
    marginBottom: 4,
  },
  auditDate: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  ratingValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  submittedInfo: {
    fontSize: 12,
    color: '#94a3b8',
  },
  findingsPreview: {
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 12,
  },
  findingsLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
    marginBottom: 4,
  },
  findingsText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    color: '#64748b',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
  },
});

export default AuditHistoryScreen;
