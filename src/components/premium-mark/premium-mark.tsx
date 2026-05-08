type PremiumMarkProps = {
  show: boolean;
  variant: keyof typeof premiumMarkConfig;
};

const premiumMarkConfig = {
  placeCard: 'place-card__mark',
  offer: 'offer__mark',
} as const;

const PremiumMark = ({ show, variant }: PremiumMarkProps) => {
  if (!show) {
    return null;
  }

  const className = premiumMarkConfig[variant];

  return (
    <div className={className}>
      <span>Premium</span>
    </div>
  );
};

export { PremiumMark };
