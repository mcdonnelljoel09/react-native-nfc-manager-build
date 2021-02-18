const constants = {
  TNF_EMPTY: 0x0,
  TNF_WELL_KNOWN: 0x01,
  TNF_MIME_MEDIA: 0x02,
  TNF_ABSOLUTE_URI: 0x03,
  TNF_EXTERNAL_TYPE: 0x04,
  TNF_UNKNOWN: 0x05,
  TNF_UNCHANGED: 0x06,
  TNF_RESERVED: 0x07,

  RTD_TEXT: 'T', // [0x54]
  RTD_URI: 'U', // [0x55]
  RTD_SMART_POSTER: 'Sp', // [0x53, 0x70]
  RTD_ALTERNATIVE_CARRIER: 'ac', //[0x61, 0x63]
  RTD_HANDOVER_CARRIER: 'Hc', // [0x48, 0x63]
  RTD_HANDOVER_REQUEST: 'Hr', // [0x48, 0x72]
  RTD_HANDOVER_SELECT: 'Hs', // [0x48, 0x73]

  MIME_WFA_WSC: 'application/vnd.wfa.wsc',

  RTD_URI_PROTOCOLS: [
    '',
    'http://www.',
    'https://www.',
    'http://',
    'https://',
    'tel:',
    'mailto:',
    'ftp://anonymous:anonymous@',
    'ftp://ftp.',
    'ftps://',
    'sftp://',
    'smb://',
    'nfs://',
    'ftp://',
    'dav://',
    'news:',
    'telnet://',
    'imap:',
    'rtsp://',
    'urn:',
    'pop:',
    'sip:',
    'sips:',
    'tftp:',
    'btspp://',
    'btl2cap://',
    'btgoep://',
    'tcpobex://',
    'irdaobex://',
    'file://',
    'urn:epc:id:',
    'urn:epc:tag:',
    'urn:epc:pat:',
    'urn:epc:raw:',
    'urn:epc:',
    'urn:nfc:',
  ],
};

module.exports = constants;
