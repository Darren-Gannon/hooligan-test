import { Injectable } from "@nestjs/common";
import { PubSub } from "graphql-subscriptions";
import { CURRENT_DATE_PUB_SUB } from "../constants";

@Injectable()
export class CurrentDatePubSub extends PubSub {
    constructor() {
        super();

        setInterval(() => {
            this.publish(CURRENT_DATE_PUB_SUB, new Date())
        }, 1000);
    }
}