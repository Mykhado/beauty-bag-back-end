export class CreateCommandeDto {
  lastnameDelivery: string;
  firstnameDelivery: string;
  date!: Date;
  addressDelivery: string;
  departementDelivery: number;
  countryDelivery: string;
  townDelivery: string;
  phoneDelivery: string;
  orderNumber: string;
  send: boolean;
}
