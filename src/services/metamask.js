import detectEthereumProvider from '@metamask/detect-provider'

let provider = null;

async function setProvider(){
  if(!provider)
    provider = await detectEthereumProvider({ mustBeMetaMask: true });
}

async function getUserAcc(){
  await setProvider();

  return provider.selectedAddress;
}

async function requestUserAcc(){
  await setProvider();
  const accts = await provider.request({ method: 'eth_requestAccounts' });

  return accts[0];
}

const metamask = {
  getUserAcc,
  requestUserAcc
}

export default metamask;