import { makeNodeType } from '@/core/form-builder';
// import { makeWorkflow } from '@/hooks/useWorkflow';

const welcomeScreen = makeNodeType('welcome-screen', 'octicon:home-16', {
  attributes: {
    label: 'Welcome',
    attachment: {
      type: 'image',
      url: 'https://quillforms.com/wp-content/uploads/2022/01/4207-ai-1.jpeg',
    },
    attachmentMaxWidth: '300px',
  },
});

const connectWallet = makeNodeType('connect-wallet', 'ion:wallet-outline', {
  attributes: {
    label: 'Connect Wallet',
  },
});

const web3Gate = makeNodeType('workflow', 'octicon:shield-lock-16', {
  attributes: {
    required: true,
    label: 'Web3 gate',
    // workflow: makeWorkflow({ steps: [] }),
  },
});

const shortText = makeNodeType('short-text', 'octicon:typography-16', {
  attributes: {
    label: 'Short text',
  },
});

const longText = makeNodeType('long-text', 'octicon:project-roadmap-16', {
  attributes: {
    label: 'Long text',
  },
});

const date = makeNodeType('date', 'octicon:calendar-16', {
  attributes: {
    label: 'Date',
  },
});

const email = makeNodeType('email', 'octicon:mention-16', {
  attributes: {
    label: 'Email',
  },
});

const dropdown = makeNodeType('dropdown', 'octicon:single-select-16', {
  attributes: {
    label: 'Dropdown',
    choices: [],
  },
});

const multipleChoice = makeNodeType(
  'multiple-choice',
  'octicon:multi-select-16',
  {
    attributes: {
      label: 'Multiple choice',
      multiple: false,
      choices: [],
    },
  }
);

const number = makeNodeType('number', 'octicon:number-16', {
  attributes: {
    label: 'Number',
  },
});

const slider = makeNodeType('slider', 'octicon:sliders-16', {
  attributes: {
    label: 'Slider',
  },
});

const attestation = makeNodeType('attestation', 'octicon:file-badge-16', {
  attributes: {
    label: 'Issue attestation',
  },
});

const mintNFT = makeNodeType('mint-nft', 'ri:nft-fill', {
  attributes: {
    label: 'Mint NFT',
  },
});

export const nodeTypes = [
  welcomeScreen,
  shortText,
  longText,
  date,
  email,
  number,
  dropdown,
  multipleChoice,
  slider,
  connectWallet,
  web3Gate,
  attestation,
  mintNFT,
];
