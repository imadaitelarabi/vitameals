import { useEffect } from 'react'
import { Redirect } from 'expo-router'
import { useAuth } from '@/contexts/AuthContext'
import { View, ActivityIndicator } from 'react-native'
import { useThemeColor } from '@/hooks/useThemeColor'
import { Colors } from '@/constants/Colors'

export default function IndexScreen() {
  const { session, loading } = useAuth()
  
  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    'background'
  )
  const primaryColor = useThemeColor(
    { light: Colors.light.primary, dark: Colors.dark.primary },
    'primary'
  )

  if (loading) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor
      }}>
        <ActivityIndicator size="large" color={primaryColor} />
      </View>
    )
  }

  if (session) {
    return <Redirect href="/(tabs)" />
  }

  return <Redirect href="/(auth)/login" />
}