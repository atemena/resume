import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  updateProfileAction,
  createTileAction,
  updateTileAction,
  deleteTileAction,
} from '../lib/actions/profile';
import { createClient } from '../lib/supabase/server';

type MockClient = {
  from: ReturnType<typeof vi.fn>;
  update?: ReturnType<typeof vi.fn>;
  insert?: ReturnType<typeof vi.fn>;
  delete?: ReturnType<typeof vi.fn>;
  eq?: ReturnType<typeof vi.fn>;
  select?: ReturnType<typeof vi.fn>;
  single?: ReturnType<typeof vi.fn>;
};

vi.mock('../lib/supabase/server');

const mockCreateClient = createClient as unknown as vi.Mock;

beforeEach(() => {
  vi.clearAllMocks();
});

function setupClient(methods: Partial<MockClient>) {
  const client: any = {
    from: vi.fn(() => client),
    update: vi.fn(() => client),
    insert: vi.fn(() => client),
    delete: vi.fn(() => client),
    eq: vi.fn(() => client),
    select: vi.fn(() => client),
    single: vi.fn(),
    ...methods,
  };
  mockCreateClient.mockResolvedValue(client);
  return client;
}

describe('profile actions', () => {
  it('updates profile', async () => {
    const client = setupClient({
      single: vi.fn().mockResolvedValue({ data: { id: '1' }, error: null }),
    });
    await expect(
      updateProfileAction('1', { display_name: 'A' }),
    ).resolves.toEqual({ id: '1' });
    expect(client.from).toHaveBeenCalledWith('profiles');
    expect(client.update).toHaveBeenCalled();
  });

  it('creates tile', async () => {
    const client = setupClient({
      single: vi.fn().mockResolvedValue({ data: { id: 't' }, error: null }),
    });
    await expect(
      createTileAction('1', {
        title: 'test',
        url: 'u',
        type: 'link',
        position: 0,
      }),
    ).resolves.toEqual({ id: 't' });
    expect(client.from).toHaveBeenCalledWith('tiles');
    expect(client.insert).toHaveBeenCalled();
  });

  it('updates tile', async () => {
    const client = setupClient({
      single: vi.fn().mockResolvedValue({ data: { id: 't' }, error: null }),
    });
    await expect(updateTileAction('t', { title: 'b' })).resolves.toEqual({ id: 't' });
    expect(client.update).toHaveBeenCalled();
  });

  it('deletes tile', async () => {
    const client = setupClient({
      eq: vi.fn().mockResolvedValue({ error: null }),
    });
    await expect(deleteTileAction('d')).resolves.toBeUndefined();
    expect(client.delete).toHaveBeenCalled();
  });
});
