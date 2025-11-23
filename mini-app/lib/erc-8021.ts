export const ERC_SUFFIX = "80218021802180218021802180218021";

export function parseTransactionSuffix(data: string) {
  // Ensure data is hex string without 0x prefix
  const hex = data.startsWith("0x") ? data.slice(2) : data;
  const suffixLen = ERC_SUFFIX.length;
  if (hex.length < suffixLen + 2) return null; // need at least suffix + schemaId

  const suffix = hex.slice(-suffixLen);
  if (suffix !== ERC_SUFFIX) return null;

  const schemaIdHex = hex.slice(-suffixLen - 2, -suffixLen);
  const schemaId = parseInt(schemaIdHex, 16);

  const schemaData = hex.slice(0, -suffixLen - 2);
  return { ercSuffix: suffix, schemaId, schemaData };
}
