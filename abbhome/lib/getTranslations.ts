// lib/getTranslations.ts
export async function getTranslations(locale: string) {
    try {
        const res = await fetch(
            `http://localhost:5000/api/words?locale=${locale}`,
            {
                cache: 'no-store',
                next: { revalidate: 0 }
            }
        );

        const data = await res.json();
        return data.success ? data.data : {};
    } catch (error) {
        console.error('Translation fetch error:', error);
        return {};
    }
}