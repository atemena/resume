import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function PATCH(req: NextRequest) {
  const id = req.nextUrl.pathname.split('/').pop() ?? '';
  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const updates = await req.json();
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', id)
    .select('id, display_name, bio')
    .single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}
