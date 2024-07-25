/* eslint-disable react/jsx-no-target-blank */
import EstimationBadge from 'components/EstimationBadge';
import { useAtom } from 'jotai';
import { useTranslation } from 'react-i18next';
import { timeAverageAtom } from 'utils/state/atoms';

type Props = {
  translationKey: string;
  badgeText?: string;
  unit?: string;
  hasTimeAverageTranslations?: boolean;
};

export function ChartTitle({
  translationKey,
  badgeText = undefined,
  unit,
  hasTimeAverageTranslations = true,
}: Props) {
  const { t } = useTranslation();
  const [timeAverage] = useAtom(timeAverageAtom);
  translationKey = hasTimeAverageTranslations
    ? `${translationKey}.${timeAverage}`
    : translationKey;
  /*
  Use local for timeAverage if exists, otherwise use local default if exists. If no translation exists, use english
  */
  return (
    <div className="flex flex-col pb-0.5">
      <div className="flex flex-row justify-between pt-4">
        <div className="flex content-center items-center gap-1.5">
          <h2>{t(translationKey)}</h2>
        </div>
        {badgeText != undefined && <EstimationBadge text={badgeText} />}
      </div>
      {unit && <div className="text-sm dark:text-gray-300">{unit}</div>}
    </div>
  );
}
