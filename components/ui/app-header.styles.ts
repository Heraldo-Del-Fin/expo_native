import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safe: { backgroundColor: 'transparent' },
  container: {
    paddingHorizontal: 12,
    paddingBottom: 8,
    paddingTop: 8,
    marginTop: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: 18, fontWeight: '700' },
  right: { position: 'absolute', right: 8, top: 12 },
  menuBtn: { padding: 8 },
  dropdown: {
    position: 'absolute',
    right: 8,
    top: 48,
    borderRadius: 8,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    overflow: 'hidden',
    borderWidth: 1,
  },
  item: { paddingHorizontal: 12, paddingVertical: 10 },
  itemText: {},
});

