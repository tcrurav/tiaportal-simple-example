import {
    OPCUAClient,
    MessageSecurityMode, SecurityPolicy,
    AttributeIds,
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
const endpointUrl = "opc.tcp://192.168.0.40:4000";

async function main() {
    try {
        // step 1 : connect to
        await client.connect(endpointUrl);
        console.log("connected !");

        // step 2 : createSession
        const session = await client.createSession();
        console.log("session created !");

        // step 4' : read a variable with read
        const maxAge = 0;
        const nodesToRead = [{
            nodeId: 'ns=3;s="Bloque de datos_2"."datos_enviar"."box_id"',
            // nodeId: 'ns=3;s="Bloque de datos_1"."puerta"',
            attributeId: AttributeIds.Value
        },
        {
            nodeId: 'ns=3;s="Bloque de datos_2"."datos_enviar"."openboxconfirmed_1"',
            // nodeId: 'ns=3;s="Bloque de datos_1"."puerta"',
            attributeId: AttributeIds.Value
        },
        {
            nodeId: 'ns=3;s="Bloque de datos_2"."datos_enviar"."openboxconfirmed_2"',
            // nodeId: 'ns=3;s="Bloque de datos_1"."puerta"',
            attributeId: AttributeIds.Value
        },
        {
            nodeId: 'ns=3;s="Bloque de datos_2"."datos_enviar"."openboxconfirmed_3"',
            // nodeId: 'ns=3;s="Bloque de datos_1"."puerta"',
            attributeId: AttributeIds.Value
        }
        ];
        let dataValue = await session.read(nodesToRead, maxAge);
        console.log(" value ", dataValue.toString());

        // step 4 y un cuarto
        var nodesToWrite = [{
            nodeId: 'ns=3;s="Bloque de datos_2"."datos_recibir"."box_id"',
            // nodeId: 'ns=3;s="Bloque de datos_1"."puerta"',
            attributeId: AttributeIds.Value,
            indexRange: null,
            value: {
                value: {
                    dataType: DataType.SByte,
                    value: 2
                }
            }
        },
        {
            nodeId: 'ns=3;s="Bloque de datos_2"."datos_recibir"."open_box"',
            // nodeId: 'ns=3;s="Bloque de datos_1"."puerta"',
            attributeId: AttributeIds.Value,
            indexRange: null,
            value: {
                value: {
                    dataType: DataType.SByte,
                    value: 0
                }
            }
        },
        {
            nodeId: 'ns=3;s="Bloque de datos_2"."datos_recibir"."closed_box"',
            // nodeId: 'ns=3;s="Bloque de datos_1"."puerta"',
            attributeId: AttributeIds.Value,
            indexRange: null,
            value: {
                value: {
                    dataType: DataType.SByte,
                    value: 1
                }
            }
        }];
        await session.write(nodesToWrite);

        // step 4 Y MEDIO' : read a variable with read AGAIN
        dataValue = await session.read(nodesToRead, maxAge);
        console.log(" value ", dataValue.toString());

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

