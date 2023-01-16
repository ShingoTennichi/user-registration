import { Client } from 'pg';

export default async function Create() {
    const client = new Client(process.env.API_KEY);
    (async () => {
        await client.connect();
        try {
            const results = await client.query("SELECT NOW()");
            console.log(results);
        } catch (err) {
            console.error("error executing query:", err);
        } finally {
            client.end();
        }
    })();
}