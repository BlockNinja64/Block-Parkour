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
controller.combos.attachCombo("ababa+b", function () {
    if (NGGYUcode == 1) {
        game.showLongText("LOL You cant farm lives sry", DialogLayout.Bottom)
    } else {
        NGGYUcode = 1
        game.showLongText("NEVER GONNA GIVE YOU UP        ALSO get a life", DialogLayout.Bottom)
        info.changeLifeBy(1)
    }
})
function timerfunction () {
    if (basiccodecountdown == 1) {
        return 600
    } else {
        return 300
    }
}
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
    game.setGameOverMessage(false, "TIMES UP")
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
        game.splash("YOU WIN! " + "TIME: " + round2decimal(timerfunction() - info.countdown()))
        game.showLongText("Thanks for playing \"Block Parkour\"   " + "v0.6.3" + "  Thur. Nov. 6, 2025" + "   Made By BlockNinja64", DialogLayout.Center)
        info.setScore(round2decimal(timerfunction() - info.countdown()))
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
controller.combos.attachCombo("udlrudlrabab", function () {
    if (basiccode == 1) {
        game.showLongText("Basic cheat code deactivated!", DialogLayout.Bottom)
        basiccode = 0
        mySprite.ay = 300
        info.changeLifeBy(-5)
    } else {
        game.showLongText("Basic cheat code activated!", DialogLayout.Bottom)
        basiccode = 1
        basiccodecountdown = 1
        mySprite.ay = 150
        info.changeLifeBy(5)
        info.changeCountdownBy(180)
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
controller.combos.attachCombo("aa+b", function () {
    game.setGameOverMessage(false, "LOL YOU DIED")
    game.setGameOverEffect(false, effects.dissolve)
    game.gameOver(false)
})
let crouched = 0
let NGGYUcode = 0
let basiccode = 0
let basiccodecountdown = 0
let level4checkpoint = 0
let level = 0
let mySprite: Sprite = null
scene.setBackgroundColor(15)
mySprite = sprites.create(assets.image`Prototype Steve`, SpriteKind.Player)
level = 0
level4checkpoint = 0
basiccodecountdown = 0
basiccode = 0
NGGYUcode = 0
controller.moveSprite(mySprite, 100, 0)
mySprite.ay = 300
scene.cameraFollowSprite(mySprite)
info.setLife(3)
game.setGameOverScoringType(game.ScoringType.LowScore)
game.splash("Block Parkour")
loadLevel(level)
game.showLongText("Press left or right to move, up or B to jump, and down or A to crouch.   Have fun!", DialogLayout.Bottom)
info.startCountdown(300)
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
game.onUpdateInterval(1, function () {
    if (mySprite.tileKindAt(TileDirection.Bottom, assets.tile`Cant touch`)) {
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
