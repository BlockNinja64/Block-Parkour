controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.vy += -100
    pause(500)
    mySprite.vy += 0
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.vy += -100
    pause(500)
    mySprite.vy += 0
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (crouched) {
        crouched = 0
        mySprite.setImage(assets.image`Prototype Steve`)
    } else {
        crouched = 1
        mySprite.setImage(assets.image`Prototype Steve Crouched`)
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (crouched) {
        mySprite.setImage(assets.image`princessLeftCrouched`)
    } else {
        mySprite.setImage(assets.image`princessLeft0`)
    }
})
function loadLevel (levelNum: number) {
    if (levelNum == 0) {
        tiles.setCurrentTilemap(tilemap`Level0`)
        mySprite.setPosition(19, 55)
    } else {
        if (levelNum == 1) {
            tiles.setCurrentTilemap(tilemap`Level1`)
            mySprite.setPosition(19, 74)
        } else {
            if (levelNum == 2) {
                tiles.setCurrentTilemap(tilemap`Level2`)
                mySprite.setPosition(64, 864)
                info.setLife(1)
            } else {
            	
            }
        }
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (crouched) {
        mySprite.setImage(assets.image`princessRightCrouched`)
    } else {
        mySprite.setImage(assets.image`princessRight`)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`Finish line`, function (sprite, location) {
    level += 1
    loadLevel(level)
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.hazardLava1, function (sprite, location) {
    info.changeLifeBy(-1)
    loadLevel(level)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (crouched) {
        crouched = 0
        mySprite.setImage(assets.image`Prototype Steve`)
    } else {
        crouched = 1
        mySprite.setImage(assets.image`Prototype Steve Crouched`)
    }
})
info.onLifeZero(function () {
    game.gameOver(false)
})
let crouched = 0
let level = 0
let mySprite: Sprite = null
scene.setBackgroundColor(9)
mySprite = sprites.create(assets.image`Prototype Steve`, SpriteKind.Player)
level = 0
controller.moveSprite(mySprite, 100, 0)
mySprite.ay = 300
scene.cameraFollowSprite(mySprite)
info.setLife(3)
loadLevel(level)
game.onUpdateInterval(100, function () {
    if (mySprite.tileKindAt(TileDirection.Center, assets.tile`collectibleRedCrystal`)) {
        info.changeLifeBy(1)
        effects.hearts.startScreenEffect(2000)
        tiles.setTileAt(mySprite.tilemapLocation(), assets.tile`transparency16`)
    }
})
