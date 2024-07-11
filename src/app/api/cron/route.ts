export async function GET() {
    const result = await fetch(
      '/api/sendEmail',
      {
        cache: 'no-store',
      },
    );
    const data = await result.json();
   
    return Response.json({ datetime: data.datetime });
  }