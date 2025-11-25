import React from 'react';
import { View, Text } from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeInRight, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { isFloodRisk, getFloodMessages } from '@/services/flood';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { styles } from './Alerts.styles';

export default function Alerts({ weather }: { weather: any }) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  if (!weather) return null;
  const risk = isFloodRisk(weather);
  const messages = getFloodMessages(weather);

  if (!risk && messages.length === 0) return null;

  const alertColor = risk ? colors.danger : colors.warning;
  const iconName = risk ? 'warning' : 'information-circle';

  // Animación de pulso personalizada para alertas de alto riesgo
  const pulseStyle = useAnimatedStyle(() => {
    if (!risk) return {};
    return {
      opacity: withRepeat(
        withTiming(0.7, { duration: 2000 }),
        -1,
        true
      ),
    };
  });

  return (
    <Animated.View entering={FadeInDown.duration(500)} style={styles.containerOuter}>
      <Animated.View
        entering={FadeIn.duration(400)}
        style={[
          styles.container,
          {
            backgroundColor: risk
              ? 'rgba(244, 67, 54, 0.08)'
              : 'rgba(255, 152, 0, 0.08)',
            borderColor: alertColor,
            borderLeftColor: alertColor,
            shadowColor: colors.shadow,
          },
          risk ? styles.high : styles.normal,
          risk ? pulseStyle : {},
        ]}
      >
        <View style={styles.header}>
          <Animated.View entering={FadeInRight.duration(400)}>
            <Ionicons name={iconName} size={22} color={alertColor} />
          </Animated.View>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { color: alertColor }]}>
              {risk ? 'ALERTA DE INUNDACIÓN' : 'Aviso de Clima'}
            </Text>
            {risk && (
              <Animated.View entering={FadeInRight.delay(200).duration(300)}>
                <View style={[styles.badge, { backgroundColor: alertColor }]}>
                  <Text style={styles.badgeText}>ALTO RIESGO</Text>
                </View>
              </Animated.View>
            )}
          </View>
        </View>

        <View style={styles.messagesContainer}>
          {messages.map((m, i) => (
            <Animated.View
              key={i}
              entering={FadeInRight.delay(300 + i * 100).duration(300)}
              style={styles.messageRow}
            >
              <View style={[styles.messageDot, { backgroundColor: alertColor }]} />
              <Text style={[styles.msg, { color: colors.text }]}>{m}</Text>
            </Animated.View>
          ))}
        </View>

        <Animated.View entering={FadeIn.delay(500).duration(400)} style={styles.noteContainer}>
          <Ionicons name="shield-checkmark" size={14} color={colors.textSecondary} />
          <Text style={[styles.note, { color: colors.textSecondary }]}>
            Mantente atento a los comunicados oficiales de la autoridad local.
          </Text>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
}
