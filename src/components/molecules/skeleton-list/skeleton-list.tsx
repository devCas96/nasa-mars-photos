import SkeletonCardItem from '@/components/atoms/skeleton-card-item/skeleton-card-item';

interface Props {
  width: number;
  height: number;
  amount: number;
}

const SkeletonList = ({ width, height, amount }: Props) =>
  Array(amount).fill(0).map((_, _key) => <SkeletonCardItem width={width} height={height} key={_key} />);

export default SkeletonList;
