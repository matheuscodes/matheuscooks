#!/bin/bash
echo [ > recipes-index;
ls -mt recipes >> recipes-index;
echo ] >> recipes-index;