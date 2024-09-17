import { useAtomValue } from 'jotai';
import { useTranslation } from 'react-i18next';
import { StateZoneData } from 'types';
import { Mode } from 'utils/constants';
import { getCarbonIntensity, getFossilFuelRatio, getRenewableRatio } from 'utils/helpers';
import { productionConsumptionAtom } from 'utils/state/atoms';

import CarbonIntensitySquare from './CarbonIntensitySquare';
import { CircularGauge } from './CircularGauge';

interface ZoneGaugesWithCO2SquareProps {
  zoneData: StateZoneData;
  withTooltips?: boolean;
}

export default function ZoneGaugesWithCO2Square({
  zoneData,
  withTooltips = false,
}: ZoneGaugesWithCO2SquareProps) {
  const { t } = useTranslation();
  const mixMode = useAtomValue(productionConsumptionAtom);
  const isConsumption = mixMode === Mode.CONSUMPTION;
  const intensity = getCarbonIntensity(zoneData, isConsumption);
  const renewable = getRenewableRatio(zoneData, isConsumption);
  const fossilFuelPercentage = getFossilFuelRatio(zoneData, isConsumption);
  return (
    <div className="flex w-full flex-row justify-evenly">
      <CarbonIntensitySquare
        data-test-id="co2-square-value"
        intensity={intensity}
        tooltipContent={
          withTooltips ? <p>{t('tooltips.zoneHeader.carbonIntensity')}</p> : undefined
        }
      />
      <CircularGauge
        name={t('country-panel.lowcarbon')}
        ratio={fossilFuelPercentage}
        tooltipContent={
          withTooltips ? <p>{t('tooltips.zoneHeader.lowcarbon')}</p> : undefined
        }
        testId="zone-header-lowcarbon-gauge"
      />
      <CircularGauge
        name={t('country-panel.renewable')}
        ratio={renewable}
        tooltipContent={
          withTooltips ? <p>{t('tooltips.zoneHeader.renewable')}</p> : undefined
        }
        testId="zone-header-renewable-gauge"
      />
    </div>
  );
}