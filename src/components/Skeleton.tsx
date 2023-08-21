type ItemHeight = "sm" | "md" | "lg";

interface SkeletonProps {
  itemHeight: ItemHeight;
  count?: number;
}

const sizes: Record<ItemHeight, number> = {
  sm: 3,
  md: 4,
  lg: 5,
};

export const Skeleton = ({ itemHeight, count = 1 }: SkeletonProps) => {
  return (
    <div role="status" className="max-w-sm animate-pulse">
      {Array.from({ length: count }, (_, index) => {
        return (
          <div
            key={index}
            className={`h-${sizes[itemHeight]} bg-gray-200 rounded-full w-48 mb-4`}
          />
        );
      })}
    </div>
  );
};
