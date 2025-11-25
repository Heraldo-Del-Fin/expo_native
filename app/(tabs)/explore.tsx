import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function ExploreScreen(){
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore (archived)</Text>
      <Text style={styles.text}>This screen is a placeholder. Use Home to see the weather UI.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { padding: 12 },
  title: { fontWeight: '700', fontSize: 18 },
  text: { marginTop: 8 }
})
