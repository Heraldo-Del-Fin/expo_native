import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  containerOuter: {
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  card: {
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  chartCard: {
    borderRadius: 12,
    overflow: 'hidden',
    padding: 4,
  },
  chartFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
  },
  footerText: {
    fontSize: 12,
    fontWeight: '500',
  },
});

