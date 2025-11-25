import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { BarChart, LineChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { styles } from './weekly-chart.styles';

const screenWidth = Dimensions.get('window').width - 48; // padding adjustments

type DayData = { day: string; tempMax: number; tempMin?: number; precipMm: number };

export default function WeeklyChart({ data }: { data: DayData[] }) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const labels = data.map(d => d.day);
  const temps = data.map(d => d.tempMax);
  const precips = data.map(d => d.precipMm);

  const barData = {
    labels,
    datasets: [{ data: temps }],
  };

  const lineData = {
    labels,
    datasets: [{ data: precips }],
  };

  const chartConfig = {
    backgroundGradientFrom: colors.backgroundCard,
    backgroundGradientTo: colors.backgroundCard,
    color: (opacity = 1) => `rgba(25, 118, 210, ${opacity})`,
    labelColor: () => colors.textSecondary,
    strokeWidth: 2,
    barPercentage: 0.7,
    decimalPlaces: 0,
  };

  const lineChartConfig = {
    backgroundGradientFrom: colors.backgroundCard,
    backgroundGradientTo: colors.backgroundCard,
    color: (opacity = 1) => `rgba(79, 195, 247, ${opacity})`,
    labelColor: () => colors.textSecondary,
    strokeWidth: 3,
    decimalPlaces: 0,
  };

  return (
    <View style={styles.containerOuter}>
      <Animated.View
        entering={FadeInDown.delay(100).duration(500)}
        style={[
          styles.card,
          {
            backgroundColor: colors.backgroundCard,
            borderColor: colors.border,
            shadowColor: colors.shadow,
          },
        ]}
      >
        <View style={styles.header}>
          <Ionicons name="calendar" size={18} color={colors.tint} />
          <Text style={[styles.title, { color: colors.text }]}>Pronóstico semanal</Text>
        </View>
        <View style={[styles.chartCard, { backgroundColor: (colors as any).blueLevel2 || colors.skyBlueLight }]}>
          <BarChart
            data={barData}
            width={screenWidth}
            height={180}
            fromZero
            yAxisLabel=""
            yAxisSuffix="°"
            showValuesOnTopOfBars
            chartConfig={chartConfig}
            style={{ marginVertical: 8, borderRadius: 12 }}
            withInnerLines={false}
            withVerticalLabels={true}
            withHorizontalLabels={true}
          />
        </View>
        <View style={styles.chartFooter}>
          <Ionicons name="thermometer" size={14} color={colors.textSecondary} />
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>Temperatura máxima (°C)</Text>
        </View>
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(200).duration(500)}
        style={[
          styles.card,
          {
            backgroundColor: colors.backgroundCard,
            borderColor: colors.border,
            shadowColor: colors.shadow,
          },
        ]}
      >
        <View style={styles.header}>
          <Ionicons name="water" size={18} color={colors.tint} />
          <Text style={[styles.title, { color: colors.text }]}>Precipitación semanal</Text>
        </View>
        <View style={[styles.chartCard, { backgroundColor: (colors as any).blueLevel2 || colors.skyBlueLight }]}>
          <LineChart
            data={lineData}
            width={screenWidth}
            height={140}
            withDots
            withShadow={true}
            withInnerLines={false}
            withOuterLines={true}
            yAxisSuffix=" mm"
            chartConfig={lineChartConfig}
            style={{ marginVertical: 8, borderRadius: 12 }}
            bezier
          />
        </View>
        <View style={styles.chartFooter}>
          <Ionicons name="rainy" size={14} color={colors.textSecondary} />
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>Precipitación (mm)</Text>
        </View>
      </Animated.View>
    </View>
  );
}
