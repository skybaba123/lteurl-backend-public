import IPinfoWrapper, { IPinfo } from "node-ipinfo";

const ipinfoWrapper = new IPinfoWrapper(process.env.IP_INFO_TOKEN);

const getIpInfo = async (ip: string) => {
  const res = await ipinfoWrapper.lookupIp(ip);

  return res;
};

export default getIpInfo;
