export type Wallet =
  | "Injected"
  | "MetaMask"
  | "WalletConnect"
  | "Coinbase Wallet";

interface WalletIcon {
  /** Make sure to pass the name of the wallet and not the id */
  name: Wallet;
}

export default function useWalletIcon(props?: WalletIcon) {
  const getIcon = (name?: Wallet) => {
    switch (name) {
      case "Injected":
        return "/icons/wallets/metamask.svg";
      case "MetaMask":
        return "/icons/wallets/metamask.svg";
      case "WalletConnect":
        return "/icons/wallets/walletconnect.svg";
      case "Coinbase Wallet":
        return "/icons/wallets/coinbase.svg";
      default:
        return "";
    }
  };

  return { path: getIcon(props?.name), getIcon };
}
