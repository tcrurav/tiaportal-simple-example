import {
    OPCUAClient,
    MessageSecurityMode, SecurityPolicy,
    AttributeIds,
    makeBrowsePath,
    ClientSubscription,
    TimestampsToReturn,
    MonitoringParametersOptions,
    // ReadValueIdLike,
    ReadValueIdOptions,
    ClientMonitoredItem,
    DataValue,
    DataType
} from "node-opcua";



const connectionStrategy = {
    initialDelay: 1000,
    maxRetry: 1
}
const options = {
    applicationName: "MyClient",
    connectionStrategy: connectionStrategy,
    securityMode: MessageSecurityMode.None,
    securityPolicy: SecurityPolicy.None,
    endpoint_must_exist: false,
};
const client = OPCUAClient.create(options);
// const endpointUrl = "opc.tcp://opcuademo.sterfive.com:26543";
const endpointUrl = "opc.tcp://192.168.0.209:4000";


// async function timeout(ms: number) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }


async function main() {
    try {
        // step 1 : connect to
        await client.connect(endpointUrl);
        console.log("connected !");

        // step 2 : createSession
        const session = await client.createSession();
        console.log("session created !");

        // step 3 : browse
        // const browseResult = await session.browse("RootFolder");

        // console.log("references of RootFolder :");
        // for (const reference of browseResult.references) {
        //     console.log("   -> ", reference.browseName.toString());
        // }


        // step 4 : read a variable with readVariableValue
        //  const dataValue2 = await session.readVariableValue("ns=3;s=Scalar_Simulation_Double");
        //  const dataValue2 = await session.readVariableValue('ns=3;s="Bloque de datos_1"."puerta"');
        //  console.log(" value = " , dataValue2.toString());

        //  const dataValue3 = await session.readVariableValue('ns=3;s="Bloque de datos_1"."abrir_puerta"');
        //  console.log(" value = " , dataValue3.toString());

        // step 4' : read a variable with read
        const maxAge = 0;
        const nodeToRead = {
            // nodeId: 'ns=3;s="Bloque de datos_1"."datos_enviar"."box_id"',
            nodeId: 'ns=3;s="Bloque de datos_1"."puerta"',
            attributeId: AttributeIds.Value
        };
        let dataValue = await session.read(nodeToRead, maxAge);
        console.log(" value ", dataValue.toString());

        // step 4 y un cuarto
        var nodesToWrite = [{
            // nodeId: 'ns=3;s="Bloque de datos_1"."datos_enviar"."box_id"',
            nodeId: 'ns=3;s="Bloque de datos_1"."puerta"',
            attributeId: AttributeIds.Value,
            indexRange: null,
            value: {
                value: {
                    dataType: DataType.Boolean,
                    value: true
                }
            }
        }];
        await session.write(nodesToWrite);

        // step 4 Y MEDIO' : read a variable with read AGAIN
        dataValue = await session.read(nodeToRead, maxAge);
        console.log(" value ", dataValue.toString());

        // step 5: install a subscription and install a monitored item for 10 seconds
        //  const subscription = ClientSubscription.create(session, {
        //      requestedPublishingInterval: 1000,
        //      requestedLifetimeCount:      100,
        //      requestedMaxKeepAliveCount:   10,
        //      maxNotificationsPerPublish:  100,
        //      publishingEnabled: true,
        //      priority: 10
        //  });

        //  subscription.on("started", function() {
        //      console.log("subscription started for 2 seconds - subscriptionId=", subscription.subscriptionId);
        //  }).on("keepalive", function() {
        //      console.log("keepalive");
        //  }).on("terminated", function() {
        //     console.log("terminated");
        //  });


        // install monitored item

        //  const itemToMonitor: ReadValueIdOptions = {
        //      nodeId: 'ns=3;s="Bloque de datos_1"."abrir_puerta"',
        //      attributeId: AttributeIds.Value
        //  };
        //  const parameters: MonitoringParametersOptions = {
        //      samplingInterval: 100,
        //      discardOldest: true,
        //      queueSize: 10
        //  };

        //  const monitoredItem  = ClientMonitoredItem.create(
        //      subscription,
        //      itemToMonitor,
        //      parameters,
        //      TimestampsToReturn.Both
        //  );

        //  monitoredItem.on("changed", (dataValue: DataValue) => {
        //     console.log(" value has changed : ", dataValue.value.toString());
        //  });



        //  async function timeout(ms: number) {
        //      return new Promise(resolve => setTimeout(resolve, ms));
        //  }
        //  await timeout(10000);

        //  console.log("now terminating subscription");
        //  await subscription.terminate();



        // step 6: finding the nodeId of a node by Browse name
        //  const browsePath = makeBrowsePath("RootFolder", "/Objects/Server.ServerStatus.BuildInfo.ProductName");

        //  const result = await session.translateBrowsePath(browsePath);
        //  const productNameNodeId = result.targets[0].targetId;
        //  console.log(" Product Name nodeId = ", productNameNodeId.toString());

        // close session
        await session.close();

        // disconnecting
        await client.disconnect();
        console.log("done !");
    } catch (err) {
        console.log("An error has occured : ", err);
    }
}
main();

