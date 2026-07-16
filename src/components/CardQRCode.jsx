"use client";

import { QRCodeCanvas } from "qrcode.react";


export default function CardQRCode({url}){


return (

<div className="flex justify-center mt-8">

<QRCodeCanvas

value={url}

size={160}

/>

</div>

);

}