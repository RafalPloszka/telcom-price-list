export type FormValues = {
  year: string;
  products: string[];
};

type SetTotal = React.Dispatch<React.SetStateAction<number | undefined>>;

export interface FormProps {
  setTotal: SetTotal;
  setTotalWithDiscount: SetTotal;
}
