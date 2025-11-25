import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  containerOuter: {
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  container: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderLeftWidth: 5,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  high: {},
  normal: {},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  messagesContainer: {
    marginBottom: 12,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 8,
    gap: 10,
  },
  messageDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 6,
  },
  msg: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  noteContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
    gap: 8,
  },
  note: {
    flex: 1,
    fontSize: 12,
    lineHeight: 16,
    fontStyle: 'italic',
  },
});

