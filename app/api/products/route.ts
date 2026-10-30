import { NextResponse } from 'next/server';
import { LUXURY_PRODUCTS } from '@/lib/products';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const collection = searchParams.get('collection');

  let products = LUXURY_PRODUCTS;
  if (collection && collection !== 'all') {
    products = products.filter((p) => p.collection.toLowerCase() === collection.toLowerCase());
  }

  return NextResponse.json({
    success: true,
    count: products.length,
    products,
  });
}
