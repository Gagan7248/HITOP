const SUPABASE_URL =
  'https://stscidhyjhupiqtntzrz.supabase.co';

const SUPABASE_KEY =
  'sb_publishable_PhORS1tEfLRR-pXi17hcyg_riEK31So';

export async function getPublishedArticles(limit = 10, offset = 0) {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/articles?select=id,title,category,type,updated_at,created_at,status&status=eq.Published&order=updated_at.desc&limit=${limit}&offset=${offset}`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Supabase error:', errorText);
      return [];
    }

    const data = await response.json();

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Failed to load Supabase articles:', error);
    return [];
  }
}

export async function getArticleById(id) {
  if (!id) {
    return null;
  }

  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/articles?select=*&id=eq.${encodeURIComponent(id)}&limit=1`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Supabase article error:', errorText);
      return null;
    }

    const data = await response.json();

    return data?.[0] || null;
  } catch (error) {
    console.error('Failed to load article:', error);
    return null;
  }
}