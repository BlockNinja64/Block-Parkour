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
scene.onOverlapTile(SpriteKind.Player, assets.tile`Finish line turn`, function (sprite, location) {
    level += 1
    loadLevel(level)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`collectibleBlueCrystal`, function (sprite2, location2) {
    if (level == 4) {
        mySprite.setPosition(640, 118)
        level4checkpoint = 1
    }
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
function round2decimal (thing_to_round: number) {
    return Math.round(thing_to_round * 100) / 100
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (crouched) {
        mySprite.setImage(assets.image`princessLeftCrouched`)
    } else {
        mySprite.setImage(assets.image`princessLeft0`)
    }
})
info.onCountdownEnd(function () {
    game.setGameOverMessage(false, "TIMES UP!")
    game.setGameOverEffect(false, effects.dissolve)
    game.gameOver(false)
})
function loadLevel (levelNum: number) {
    if (levelNum == 0) {
        tiles.setCurrentTilemap(tilemap`Level0`)
        mySprite.setPosition(19, 55)
        game.splash("LEVEL 0 ")
    } else if (levelNum == 1) {
        tiles.setCurrentTilemap(tilemap`Level1`)
        mySprite.setPosition(19, 74)
        game.splash("LEVEL 1 ")
    } else if (levelNum == 2) {
        tiles.setCurrentTilemap(tilemap`Level2`)
        mySprite.setPosition(64, 864)
        game.splash("LEVEL 2 ")
    } else if (levelNum == 3) {
        tiles.setCurrentTilemap(tilemap`Level3`)
        mySprite.setPosition(16, 176)
        game.splash("LEVEL 3 ")
    } else if (levelNum == 4) {
        if (level4checkpoint == 1) {
            mySprite.setPosition(640, 118)
        } else {
            tiles.setCurrentTilemap(tilemap`level4`)
            mySprite.setPosition(7, 140)
            game.splash("LEVEL 4")
        }
    } else if (levelNum == 5) {
        effects.confetti.startScreenEffect(100000000)
        game.splash("YOU WIN! " + "TIME: " + round2decimal(600 - info.countdown()))
        game.showLongText("Thanks for playing \"Block Parkour\"   " + "0.4.0" + "  Sat. Jun. 21, 2025", DialogLayout.Center)
        info.setScore(round2decimal(600 - info.countdown()))
        info.stopCountdown()
        game.setGameOverMessage(true, "GAME OVER")
        game.gameOver(true)
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (crouched) {
        mySprite.setImage(assets.image`princessRightCrouched`)
    } else {
        mySprite.setImage(assets.image`princessRight`)
    }
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
    game.setGameOverMessage(false, "YOU DIED")
    game.setGameOverEffect(false, effects.dissolve)
    game.gameOver(false)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`Finish line`, function (sprite2, location2) {
    level += 1
    loadLevel(level)
})
let crouched = 0
let level4checkpoint = 0
let level = 0
let mySprite: Sprite = null
game.splash("Block Parkour")
scene.setBackgroundColor(15)
mySprite = sprites.create(assets.image`Prototype Steve`, SpriteKind.Player)
level = 0
level4checkpoint = 0
controller.moveSprite(mySprite, 100, 0)
mySprite.ay = 300
scene.cameraFollowSprite(mySprite)
info.setLife(3)
loadLevel(level)
game.setGameOverScoringType(game.ScoringType.LowScore)
game.showLongText("Press left or right to move, up or B to jump, and down or A to crouch.   Have fun!", DialogLayout.Bottom)
info.startCountdown(600)
game.onUpdateInterval(1, function () {
    if (mySprite.tileKindAt(TileDirection.Bottom, sprites.dungeon.hazardLava1)) {
        info.changeLifeBy(-1)
        scene.cameraShake(6, 500)
        if (info.life() == 0) {
            game.setGameOverMessage(false, "YOU DIED")
            game.setGameOverEffect(false, effects.dissolve)
            game.gameOver(false)
        } else {
            loadLevel(level)
        }
    }
})
game.onUpdateInterval(75, function () {
    if (mySprite.tileKindAt(TileDirection.Center, assets.tile`collectibleRedCrystal`)) {
        info.changeLifeBy(1)
        effects.hearts.startScreenEffect(2000)
        tiles.setTileAt(mySprite.tilemapLocation(), assets.tile`transparency16`)
    }
})
