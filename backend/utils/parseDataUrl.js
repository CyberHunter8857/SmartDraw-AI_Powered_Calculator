export function parseDataUrl(dataUrl) {
    // "data:image/png;base64,AAAA..."
    const [header, base64] = (dataUrl || "").split(",");
    if (!header || !base64) throw new Error("Invalid data URL for 'image'.");
    const match = header.match(/^data:(.+);base64$/i);
    if (!match) throw new Error("Unsupported data URL header.");
    return { mimeType: match[1], base64 };
}
