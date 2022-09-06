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

  
  $("#linkShowAddressesAndBalances").click(function () {
    $("#passwordShowAddresses").val("");
    $("#divAddressesAndBalances").empty();
    showView("viewShowAddressesAndBalances");
  });

  $("#linkSendTransaction").click(function () {
    $("#divSignAndSendTransaction").hide();

    $("#passwordSendTransaction").val("");
    $("#transferValue").val("");
    $("#senderAddress").empty();

    $("#textareaSignedTransaction").val("");
    $("#textareaSendTransactionResult").val("");

    showView("viewSendTransaction");
  });

  $("#linkExport").click(function () {
    showView("viewExportWallet");
    $("#currentWalletToExport").val(window.localStorage.JSON);
  });

  $("#linkContract").click(function () {
    showView("viewContract");
    $("#contractAddress").val(SAMPLE_CONTRACT_ADDRESS);
    $("#textareaContractABI").val(JSON.stringify(SAMPLE_ABI, null, " "));
  });

  $("#buttonGenerateNewWallet").click(generateNewWallet);
  $("#buttonOpenExistingWallet").click(openWalletFromMnemonic);
  $("#buttonUploadWallet").click(openWalletFromFile);
  $("#buttonShowMnemonic").click(showMnemonic);
  $("#buttonShowAddresses").click(showAddressesAndBalances);
  $("#buttonSendAddresses").click(unlockWalletAndDeriveAddresses);
  $("#buttonSignTransaction").click(signTransaction);
  $("#buttonSendSignedTransaction").click(sendTransaction);
  $("#exportWalletForReal").click(exportWalletToJSONFile);
  $("#contractAddressInitialize").click(initializeContract);
  $("#contractExecute").click(executeContract);

  $("#linkDelete").click(deleteWallet);

  function showView(viewName) {
    // Hide all views and show the selected view only
    $("main > section").hide();
    $("#" + viewName).show();

   
    if (localStorage.JSON) {
      $("#linkCreateNewWallet").hide();
      $("#linkImportWalletFromMnemonic").hide();
      $("#linkImportWalletFromFile").hide();

      $("#linkShowMnemonic").show();
      $("#linkShowAddressesAndBalances").show();
      $("#linkSendTransaction").show();
      $("#linkDelete").show();
      $("#linkContract").show();
      $("#linkExport").show();
      
    } else {
      $("#linkShowMnemonic").hide();
      $("#linkShowAddressesAndBalances").hide();
      $("#linkSendTransaction").hide();
      $("#linkDelete").hide();
      $("#linkContract").hide();
      $("#linkExport").hide();

      $("#linkCreateNewWallet").show();
      $("#linkImportWalletFromMnemonic").show();
      $("#linkImportWalletFromFile").show();
    }
  }

  function showInfo(message) {
    $("#infoBox>p").html(message);
    $("#infoBox").show();
    $("#infoBox>header").click(function () {
      $("#infoBox").hide();
    });
  }

  function showError(errorMsg) {
    $("#errorBox>p").html("Error: " + errorMsg);
    $("#errorBox").show();
    $("#errorBox>header").click(function () {
      $("#errorBox").hide();
    });
  }

  function showLoadingProgress(percent) {
    $("#loadingBox").html(
      "Loading... " + parseInt(percent * 100) + "% complete"
    );
    $("#loadingBox").show();
    $("#loadingBox>header").click(function () {
      $("#errorBox").hide();
    });
  }

  function hideLoadingBar() {
    $("#loadingBox").hide();
  }

  function showLoggedInButtons() {
    $("#linkCreateNewWallet").hide();
    $("#linkImportWalletFromMnemonic").hide();
    $("#linkImportWalletFromFile").hide();

    $("#linkShowMnemonic").show();
    $("#linkShowAddressesAndBalances").show();
    $("#linkSendTransaction").show();
    $("#linkDelete").show();
    $("#linkContract").show();
    $("#linkExport").show();
  }
  
	async function encryptAndSaveJSON(wallet, password) {
		let encryptedWallet;

		try {
			encryptedWallet = await wallet.encrypt(
				password,
				{},
				showLoadingProgress
			);
		} catch (e) {
			showError(e);
			return;
		} finally {
			hideLoadingBar();
		}
		
		window.localStorage["JSON"] = encryptedWallet;
		showLoggedInButtons();
	}
	 
		function decryptWallet(json, password) {
		return ethers.Wallet.fromEncryptedJson(json, password, showLoadingProgress);
	}

	async function generateNewWallet() {
		const password = $("#passwordCreateWallet").val();
		const randomNumber = Math.random();
		const wallet = ethers.Wallet.createRandom([password, randomnumber]);
		await encryptAndSaveJSON(wallet, password);
		showInfo("Please save your mnemonic:" + wallet.mnemonic.phrase);
		$("#textareaCreateWalletResult").val(window.localStorage.JSON);
	}
	 
	 async function openWalletFromMnemonic() {
		const mnemonic = $("#textareaOpenWallet").val();

    if(!ethers.utils.isValidMnemonic(mnemonic)) {
      showError("Invalid Mnemonic");
    } else {
      const wallet = ethers.Wallet.fromMnemonic(mnemonic);
      const password = $("#passwordOpenWallet").val();

      await encryptAndSaveJSON(wallet, password);
      showInfo("Wallet loaded successfully!");
      $("#textareaOpenWalletResult").val(window.localStorage.JSON);
    }
}
  
