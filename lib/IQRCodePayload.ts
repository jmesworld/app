
export interface IQRCodePayload {
    prefix?: string;
    address?: string;
    username?: string;
    amount?: string | number;
    data?: any;
    url?: string;
    function?: string;
    chain_id?: string;
}
