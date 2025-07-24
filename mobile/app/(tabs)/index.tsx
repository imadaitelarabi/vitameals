import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

export default function HomeScreen() {
  const backgroundColor = useThemeColor({ light: Colors.light.background, dark: Colors.dark.background }, 'background');
  const primaryColor = useThemeColor({ light: Colors.light.primary, dark: Colors.dark.primary }, 'primary');
  const textColor = useThemeColor({ light: Colors.light.text, dark: Colors.dark.text }, 'text');

  const menuItems = [
    {
      title: 'Reserve a Meal',
      icon: 'calendar-outline',
      onPress: () => {
        router.push('/reserve-meal');
      },
    },
    {
      title: 'Explore Menu',
      icon: 'book-outline',
      onPress: () => {
        router.push('/explore-menu');
      },
    },
    {
      title: 'My Orders',
      icon: 'receipt-outline',
      onPress: () => {
        router.push('/my-orders');
      },
    },
    {
      title: 'Profile',
      icon: 'person-outline',
      onPress: () => {
        router.push('/profile');
      },
    },
  ];

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        <View style={styles.welcomeContainer}>
          <ThemedText style={[styles.welcomeText, { color: textColor }]}>Welcome,</ThemedText>
          <ThemedText style={[styles.nameText, { color: textColor }]}>John Doe!</ThemedText>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color={textColor} />
        </TouchableOpacity>
      </View>

      <View style={styles.centerContainer}>
        <View style={styles.menuGrid}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.menuItem, { backgroundColor: primaryColor }]}
              onPress={item.onPress}
            >
              <Ionicons name={item.icon as any} size={32} color="white" />
              <ThemedText style={styles.menuItemText}>{item.title}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 60,
    marginBottom: 60,
  },
  welcomeContainer: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 4,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  notificationButton: {
    padding: 8,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
    maxWidth: 320,
  },
  menuItem: {
    width: 140,
    height: 140,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  menuItemText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 12,
  },
});
