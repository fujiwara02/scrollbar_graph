from typing import *
import pickle
import torch
from sklearn.preprocessing import StandardScaler, LabelEncoder
import codecs
import numpy as np


class StaticType(TypedDict):
  terms: LabelEncoder #数値に変える
  scaler: StandardScaler #比率を統一する
  seq_len: int


#outputs[338][86][231]　index, time, kind
OUTPUT_FILE = "C:/Users/def83/outputs.pickle" 

out: dict[Literal["outputs", "output_lengths", "targets", "target_lengths"], torch.Tensor] = pickle.load(open(OUTPUT_FILE, "rb"))

static: StaticType = pickle.load(open("C:/Users/def83/KSLD1.9.static.pkl", "rb"))


def data_get(idx):

  #idx=335の使われている単語の組み合わせ(1次元)
  target = out["targets"][idx, :out["target_lengths"][idx]]

  #単語の合致率、合計が1になるように調節している(2次元)
  output = out["outputs"][idx, :out["output_lengths"][idx]].softmax(-1)
  print(target)


  #数値から単語に変換する ['私' '弟' '趣味' '映画' '見る']
  target_label = static["terms"].inverse_transform(target)
  print(target_label)

  #tensorから1要素づつ抜き出す
  target_label_2 = "','" .join(map(str, target_label))   
  
  with codecs.open('targets_word.js', 'w', encoding='utf-8') as fout:
    fout.write("const myArray = ['")
    fout.write(target_label_2)
    fout.write("']; export default myArray;")



  for cls in range(target.shape[-1]): #使われている単語の数だけループ

    #使われている単語の番号
    number = target[cls]

    #2次元目の値がclsだけの1次元目の値のリストを作る
    y = output[..., number] 


    if(cls == 0):
      #合計を1にするために調節する関数
      outputs = [l.item() for l in output[..., 0] ]
      with open('outputs.js', 'w') as fout:
        fout.write("const myArray = ")
        fout.write(str(outputs))
        fout.write("; export default myArray;")


    if(cls == 0):
      outputs0 = [l.item() for l in y]
      with open('outputs0.js', 'w') as fout:
        fout.write("const myArray = ")
        fout.write(str(outputs0))
        fout.write("; export default myArray;")
      

    if(cls == 1):
      outputs1 = [l.item() for l in y]
      with open('outputs1.js', 'w') as fout:
        fout.write("const myArray = ")
        fout.write(str(outputs1))
        fout.write("; export default myArray;")
    

    if(cls == 2):
      outputs2 = [l.item() for l in y]
      with open('outputs2.js', 'w') as fout:
        fout.write("const myArray = ")
        fout.write(str(outputs2))
        fout.write("; export default myArray;")
     

    if(cls == 3):
      outputs3 = [l.item() for l in y]
      with open('outputs3.js', 'w') as fout:
        fout.write("const myArray = ")
        fout.write(str(outputs3))
        fout.write("; export default myArray;")
    

    if(cls == 4):
      outputs4 = [l.item() for l in y]
      with open('outputs4.js', 'w') as fout:
        fout.write("const myArray = ")
        fout.write(str(outputs4))
        fout.write("; export default myArray;")
      
    
    

#使われている動画の種類によって変更する
IDX = 180

#data_get関数を呼び出す
data_get(IDX)

