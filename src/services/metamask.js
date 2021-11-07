import detectEthereumProvider from '@metamask/detect-provider'

let provider = null;

async function getProvider(){
  if(!provider)
    provider = await detectEthereumProvider({ mustBeMetaMask: true });
  
  return provider;
}

async function getUserAcc(){
  const provider = await getProvider();
  return provider.selectedAddress;
}

async function requestUserAcc(){
  const provider = await getProvider();
  const accts = await provider.request({ method: 'eth_requestAccounts' });
  return accts[0];
}

const metamask = {
  getProvider,
  getUserAcc,
  requestUserAcc
}

export default metamask;