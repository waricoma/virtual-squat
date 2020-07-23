[virtual-squat_express](../README.md) › [Globals](../globals.md) › ["line/interface"](_line_interface_.md)

# Module: "line/interface"

## Index

### Classes

* [MsgTypeAudio](../classes/_line_interface_.msgtypeaudio.md)
* [MsgTypeFile](../classes/_line_interface_.msgtypefile.md)
* [MsgTypeImage](../classes/_line_interface_.msgtypeimage.md)
* [MsgTypeLocation](../classes/_line_interface_.msgtypelocation.md)
* [MsgTypeSticker](../classes/_line_interface_.msgtypesticker.md)
* [MsgTypeText](../classes/_line_interface_.msgtypetext.md)
* [MsgTypeVideo](../classes/_line_interface_.msgtypevideo.md)

### Type aliases

* [ContentProvider](_line_interface_.md#contentprovider)
* [Media](_line_interface_.md#media)
* [MinMax](_line_interface_.md#minmax)
* [MsgTask](_line_interface_.md#msgtask)
* [Source](_line_interface_.md#source)
* [StickerResourceType](_line_interface_.md#stickerresourcetype)
* [Task](_line_interface_.md#task)

## Type aliases

###  ContentProvider

Ƭ **ContentProvider**: *"line" | "external"*

Defined in server/line/interface.ts:23

___

###  Media

Ƭ **Media**: *object*

Defined in server/line/interface.ts:30

#### Type declaration:

* **contentProvider**? : *[ContentProvider](_line_interface_.md#contentprovider)*

* **duration**? : *[MinMax](_line_interface_.md#minmax)*

___

###  MinMax

Ƭ **MinMax**: *object*

Defined in server/line/interface.ts:25

#### Type declaration:

* **max**? : *number*

* **min**? : *number*

___

###  MsgTask

Ƭ **MsgTask**: *object*

Defined in server/line/interface.ts:1

#### Type declaration:

* **source**? : *[Source](_line_interface_.md#source)*

* **task**: *[Task](_line_interface_.md#task)*

* **type**? : *[MsgTypeText](../classes/_line_interface_.msgtypetext.md) | [MsgTypeImage](../classes/_line_interface_.msgtypeimage.md) | [MsgTypeVideo](../classes/_line_interface_.msgtypevideo.md) | [MsgTypeAudio](../classes/_line_interface_.msgtypeaudio.md) | [MsgTypeFile](../classes/_line_interface_.msgtypefile.md) | [MsgTypeLocation](../classes/_line_interface_.msgtypelocation.md) | [MsgTypeSticker](../classes/_line_interface_.msgtypesticker.md)*

___

###  Source

Ƭ **Source**: *object*

Defined in server/line/interface.ts:16

#### Type declaration:

* **groupId**? : *string*

* **roomId**? : *string*

* **type**? : *"user" | "group" | "room"*

* **userId**? : *string*

___

###  StickerResourceType

Ƭ **StickerResourceType**: *"STATIC" | "ANIMATION" | "SOUND" | "ANIMATION_SOUND" | "POPUP" | "POPUP_SOUND" | "NAME_TEXT" | "PER_STICKER_TEXT"*

Defined in server/line/interface.ts:42

___

###  Task

Ƭ **Task**: *function*

Defined in server/line/interface.ts:14

#### Type declaration:

▸ (`event`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`event` | any |
