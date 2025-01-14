const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

// Inicializa o cliente S3 (as credenciais serão buscadas automaticamente pela AWS SDK)
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      sessionToken: 'IQoJb3JpZ2luX2VjEC8aCXVzLWVhc3QtMSJIMEYCIQCJD8mr4M6iRlQi7jYHkqND7UvhHsMgLSYi6INXAFEOIwIhAMxLwM8oq4+kDge/MXz/Ids3gpiMPK1F75VWX4SoQ74AKqUDCHcQABoMNTQ1MDA5ODQ0OTM3IgwKQVWN1N/J+aq5PB0qggOdQZPbQUxvXB4kORm3i40arqwfbWGKyWxeWFfPSjrR06aH/3uADdN+hA6MuZVqt4QARRlYIblRk4d3fxETUB94ohoe/uqeWWXkwhHZG/8mM1Nc+YnfASUqQUtj2nhA/CzpnuVFgQWq8oXKgCwFTVoqNXsOwPl3EMmZvU/JZ1HoZAkwz9rcwDq/Ip/aJeTnVJG+OEk9Jhq4uedO80RO2GvYvtcj9PZW2OcVvMvpEtKmDOoRmopCQM43UhGH3cYCeboZBfdE8DVNQgTvjIcXq3lgwIxfHgZnq7/FUkTNE6bLVUqEqUdvTXoScpZIxJzb4VgdDKR7qKuKggDHN12tJAt6cmE0X85P0rmOesyD4ujBQCH+01gTutuSsIEZPZsxOhsiTfxBrLfYHQOTS74QikQT60slJikqm9vZQq2s16JTl5m2DIo8gfnNqIEzwGV3jfgdslYeLPcLoBe5REfCLxAgKXcYtZEhyGI79twINLGqPVTGIo4EkV30wQV3rEKQPaSSTjDl4uq3BjqlAQNkxo+u6MI3kNhGpnONG3tiDTYIyE+uLEsY5MFWNn+R5OP3p5iCcUaiak0Ec/GOXPECj2wAF3UgOa6v6pco9UiwIxGPR0oW3lGEN2j9DNkSk4W6MALG2KH++1VEAbKv7mhumdhcn4t96zoA1JwJYulnHl8pR6hxu43IOkYsNKwikNZ8kSbpUbLlJSRLwjYPmHiKGrFG1345cYcmc2AEEXi6Z2FLQQ==',
    }
});

const saveToFile = async (data) => {
  try {
    // Converte o JSON para string
    const jsonData = JSON.stringify(data, null, 2);

    // Define o nome fixo do arquivo no S3
    const fileKey = 'rss-data.json';

    // Define o comando de upload para o S3
    const putCommand = new PutObjectCommand({
      Bucket: "sprints-2-3-pb-aws-agosto-b",
      Key: fileKey,
      Body: jsonData,
      ContentType: "application/json",
    });


    await s3Client.send(putCommand);

    console.log(`File saved to S3: ${fileKey}`);
    return fileKey;
  } catch (err) {
    console.error("Failed to save file to S3:", err.message);
    throw err;
  }
};


module.exports = { saveToFile };