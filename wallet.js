/**
 * The EthersJS library that comes with this exercise is using EthersJS Version 5.1.
 * Check documentation here: https://docs.ethers.io/v5/
 */

 $(document).ready(function () {
  const derivationPath = "m/44'/60'/0'/0/";
  const provider = ethers.getDefaultProvider("ropsten");

  let wallets = {};
  let contract;

  const SAMPLE_CONTRACT_ADDRESS = "";
  const SAMPLE_ABI = [];

  showView("viewHome");

  $("#linkHome").click(function () {
    showView("viewHome");
  });

  $("#linkCreateNewWallet").click(function () {
    $("#passwordCreateWallet").val("");
    $("#textareaCreateWalletResult").val("");
    showView("viewCreateNewWallet");
  });

  $("#linkImportWalletFromMnemonic").click(function () {
    $("#textareaOpenWallet").val("");
    $("#passwordOpenWallet").val("");
    $("#textareaOpenWalletResult").val("");
    $("#textareaOpenWallet").val(
      "toddler online monitor oblige solid enrich cycle animal mad prevent hockey motor"
    );
    showView("viewOpenWalletFromMnemonic");
  });

  $("#linkImportWalletFromFile").click(function () {
    $("#walletForUpload").val("");
    $("#passwordUploadWallet").val("");
    showView("viewOpenWalletFromFile");
  });

  $("#linkShowMnemonic").click(function () {
    $("#passwordShowMnemonic").val("");
    showView("viewShowMnemonic");
  });
