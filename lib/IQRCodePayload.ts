export interface IQRCodePayload {
    prefix: string;
    address: string;
    amount: string | number;
    function?: string;
    chain_id?: string;
   
}
