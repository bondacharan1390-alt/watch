import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customer, shippingAddress, items, pricing, paymentMethod } = body;

    if (!customer?.name || !customer?.email || !shippingAddress?.address) {
      return NextResponse.json(
        { success: false, message: 'Invalid customer or delivery dossier.' },
        { status: 400 }
      );
    }

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Shopping bag contains no items.' },
        { status: 400 }
      );
    }

    // Generate Unique Swiss Order Protocol ID
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `CHARAN-2026-${randomSuffix}`;

    const order = {
      orderId,
      status: 'AUTHENTICATED_AND_QUEUED',
      createdAt: new Date().toISOString(),
      customer,
      shippingAddress,
      items,
      pricing,
      paymentMethod,
      transitTracking: `SWISS-ARMORED-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
    };

    return NextResponse.json({
      success: true,
      message: 'Order verified and allocation confirmed.',
      order,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || 'Server error processing checkout.' },
      { status: 500 }
    );
  }
}
