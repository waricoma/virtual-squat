[virtual-squat_express](../README.md) › [Globals](../globals.md) › ["line/helper"](../modules/_line_helper_.md) › [LineEvRouteingHelper](_line_helper_.lineevrouteinghelper.md)

# Class: LineEvRouteingHelper

## Hierarchy

* **LineEvRouteingHelper**

## Index

### Properties

* [msgTasks](_line_helper_.lineevrouteinghelper.md#private-msgtasks)

### Methods

* [hears](_line_helper_.lineevrouteinghelper.md#hears)
* [msgEv](_line_helper_.lineevrouteinghelper.md#msgev)
* [msgEvHandler](_line_helper_.lineevrouteinghelper.md#private-msgevhandler)

## Properties

### `Private` msgTasks

• **msgTasks**: *[MsgTask](../modules/_line_interface_.md#msgtask)[]* = []

Defined in server/line/helper.ts:21

## Methods

###  hears

▸ **hears**(`event`: line.WebhookEvent): *Promise‹void›*

Defined in server/line/helper.ts:15

**Parameters:**

Name | Type |
------ | ------ |
`event` | line.WebhookEvent |

**Returns:** *Promise‹void›*

___

###  msgEv

▸ **msgEv**(`msgTask`: [MsgTask](../modules/_line_interface_.md#msgtask)): *void*

Defined in server/line/helper.ts:23

**Parameters:**

Name | Type |
------ | ------ |
`msgTask` | [MsgTask](../modules/_line_interface_.md#msgtask) |

**Returns:** *void*

___

### `Private` msgEvHandler

▸ **msgEvHandler**(`event`: any): *Promise‹void›*

Defined in server/line/helper.ts:27

**Parameters:**

Name | Type |
------ | ------ |
`event` | any |

**Returns:** *Promise‹void›*
