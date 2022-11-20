// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract fileVerifier {

    struct metaData {
      address origin;
      uint256 blockNumber;
      bool exists;
    }

    mapping (bytes32 => metaData) hashTometaData;

    function addFile(bytes32 _fileHash) external returns (bool) {
        require(!hashTometaData[_fileHash].exists, 'File already exists');

        hashTometaData[_fileHash] = metaData(
          msg.sender,
          block.number,
          true
        );
        return true;
    }

    function verifyFileOrigin(
      address _originAddress,
      bytes32 _fileHash
    ) external view returns (bool) {
      metaData memory file = hashTometaData[_fileHash];
      return file.exists && _originAddress == file.origin;
    }

    function getFileOrigin(bytes32 _fileHash) external view returns (address) {
      metaData memory file = hashTometaData[_fileHash];
      require(file.exists, 'File doesnt exists');
      return file.origin;
    }

}