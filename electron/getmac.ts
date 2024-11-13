import { networkInterfaces } from "os";

type Item = { address: string; mac: string; netmask: string; family: string };
export default function getMAC(): string {
  const list = networkInterfaces() as Record<string, Item[]>;
  const items: Item[] = [];
  Object.keys(list).forEach((key) => {
    list[key].forEach((s) => {
      items.push({
        address: s.address,
        mac: s.mac,
        netmask: s.netmask,
        family: s.family,
      });
    });
  });
  const item = items.find(
    (s) =>
      s.family.toUpperCase() === "IPV4" &&
      s.address !== "127.0.0.1" &&
      s.address !== "0.0.0.0" &&
      /^(\d{1,3}\.){3}\d{1,3}$/.test(s.address),
  );
  return item?.mac || items[0]?.mac || "";
}
