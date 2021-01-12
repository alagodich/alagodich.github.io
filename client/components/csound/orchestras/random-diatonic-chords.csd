<CsoundSynthesizer>
<CsOptions>
-n -d -+rtmidi=NULL -M0 -m0d --midi-key-cps=4 --midi-velocity-amp=5
</CsOptions>
<CsInstruments>
sr=44100
ksmps=32
0dbfs=1
nchnls=2

itmp ftgen 1, 0, 1024, 10, 1, 0.3, 0.2, 0.05

instr 99

seed 0
kclock lfo 1, .5, 3
ktirg trigger kclock, .5, 0

kinstr random 1, 8
schedkwhen ktirg, 0, 0, kinstr, 0, 2

endin

instr 1 ; C maj
kenv adsr .2, .2, .5, .2
a1 poscil .1, 261, 1
a2 poscil .1, 329, 1
a3 poscil .1, 392, 1
ain = a1+a2+a3
outs ain*kenv, ain*kenv
endin

instr 2 ; D min
kenv adsr .2, .2, .5, .2
a1 poscil .1, 293, 1
a2 poscil .1, 349, 1
a3 poscil .1, 440, 1
ain = a1+a2+a3
outs ain*kenv, ain*kenv
endin

instr 3 ; E min
kenv adsr .2, .2, .5, .2
a1 poscil .1, 329, 1
a2 poscil .1, 392, 1
a3 poscil .1, 493, 1
ain = a1+a2+a3
outs ain*kenv, ain*kenv
endin

instr 4 ; F maj
kenv adsr .2, .2, .5, .2
a1 poscil .1, 349, 1
a2 poscil .1, 440, 1
a3 poscil .1, 261, 1
ain = a1+a2+a3
outs ain*kenv, ain*kenv
endin

instr 5 ; G maj
kenv adsr .2, .2, .5, .2
a1 poscil .1, 392, 1
a2 poscil .1, 493, 1
a3 poscil .1, 293, 1
ain = a1+a2+a3
outs ain*kenv, ain*kenv
endin

instr 6 ; A min
kenv adsr .2, .2, .5, .2
a1 poscil .1, 440, 1
a2 poscil .1, 261, 1
a3 poscil .1, 329, 1
ain = a1+a2+a3
outs ain*kenv, ain*kenv
endin

instr 7 ; B min
kenv adsr .2, .2, .5, .2
a1 poscil .1, 493, 1
a2 poscil .1, 293, 1
a3 poscil .1, 349, 1
ain = a1+a2+a3
outs ain*kenv, ain*kenv
endin

</CsInstruments>
<CsScore>
i99 0 z
</CsScore>
</CsoundSynthesizer>
