import { serveStatic } from "@hono/node-server/serve-static";
import { Button, Frog, TextInput, parseEther } from "frog";
import { devtools } from "frog/dev";
import { createPublicClient } from "viem";
// import { neynar } from 'frog/hubs'

// Utilies //
// export async function balanceOf(address: string) {
//   try {
//     const balanceData = await createPublicClient.readContract({
//       address: contractAddress,
//       abi: contractAbi.output.abi,
//       functionName: "getMonster",
//       args: [address as `0x`, 0]
//     });
//     const balance: number = Number(balanceData)
//     return balance
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// }

// Frames //

export const app = new Frog({
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
});

app.use("/*", serveStatic({ root: "./public" }));

app.frame("/test", (c) => {
  const { buttonValue, inputText, status } = c;
  const fruit = inputText || buttonValue;
  return c.res({
    image: (
      <div
        style={{
          alignItems: "center",
          background:
            status === "response"
              ? "linear-gradient(to right, #432889, #17101F)"
              : "black",
          backgroundSize: "100% 100%",
          backgroundImage:
            'url("https://i.pinimg.com/originals/4e/de/5a/4ede5a33c5490195b2b17466ad26d124.gif")',
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 60,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            marginTop: 30,
            padding: "0 120px",
            whiteSpace: "pre-wrap",
          }}
        >
          {status === "response"
            ? `Nice choice.${fruit ? ` ${fruit.toUpperCase()}!!` : ""}`
            : "Welcome!"}
        </div>
      </div>
    ),
    intents: [
      <TextInput placeholder="Enter custom fruit..." />,
      <Button value="apples">Apples</Button>,
      <Button value="oranges">Oranges</Button>,
      <Button value="bananas">Bananas</Button>,
      status === "response" && <Button.Reset>Reset</Button.Reset>,
    ],
  });
});

app.frame("/", (c) => {
  const { buttonValue, inputText, status } = c;
  return c.res({
    image: (
      <div
        style={{
          alignItems: "center",
          background:
            status === "response"
              ? "linear-gradient(to right, #432889, #17101F)"
              : "black",
          backgroundSize: "100% 100%",
          backgroundImage:
            'url("https://i.pinimg.com/originals/4e/de/5a/4ede5a33c5490195b2b17466ad26d124.gif")',
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 60,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            marginTop: 30,
            padding: "0 120px",
            whiteSpace: "pre-wrap",
          }}
        >
          Welcome to FrameMon
        </div>
      </div>
    ),
    imageOptions: {},
    intents: [<Button value="Go" action="/start">{`Play`}</Button>],
  });
});

app.frame("/start", (c) => {
  const hasCat = false;
  if (hasCat) {
    return c.res({
      image: <div>Has Cat</div>,
      imageOptions: {},
      intents: [
        <Button value="cat1" action="/mint">
          Feed
        </Button>,
        <Button value="cat2" action="/mint">
          Play
        </Button>,
      ],
    });
  }

  const { buttonValue, inputText, status } = c;
  return c.res({
    image: "/cat01_idle_8fps.gif",
    imageOptions: {},
    intents: [
      <Button value="cat1" action="/mint">
        Cat 1
      </Button>,
      <Button value="cat2" action="/mint">
        Cat 2
      </Button>,
      <Button value="cat3" action="/mint">
        Cat 3
      </Button>,
      <Button value="cat4" action="/mint">
        Cat 4
      </Button>,
      status === "response" && <Button.Reset>Reset</Button.Reset>,
    ],
  });
});

app.frame("/mint", (c) => {
  const { buttonValue, inputText, status } = c;
  return c.res({
    image: <div style={{ fontSize: 60 }}>{buttonValue}</div>,
    imageOptions: {},
    intents: [
      <TextInput placeholder="Name your pet..." />,
      <Button value="mint">Mint</Button>,
      status === "response" && <Button.Reset>Reset</Button.Reset>,
    ],
  });
});

// app.transaction("/mint-pet", (c) => {
//   const { inputText } = c;
//   // Contract transaction response.
//   return c.contract({
//     abi,
//     chainId: "eip155:10",
//     functionName: "mint",
//     args: [69420n],
//     to: "0xd2135CfB216b74109775236E36d4b433F1DF507B",
//     value: parseEther(inputText),
//   });
// });

devtools(app, { serveStatic });
