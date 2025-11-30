package storage

import (
	"os"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
)

type PbDb struct {
	Pb *pocketbase.PocketBase
}

func NewBackOfficeStorage() (*PbDb, error) {
	s := pocketbase.New()

	if err := s.Start(); err != nil {
		return nil, err
	}

	s.OnServe().BindFunc(func(e *core.ServeEvent) error {
		e.Router.GET("/p/", apis.Static(os.DirFS("./pb_public"), false))
		return e.Next()
	})
	err := s.Bootstrap()
	if err != nil {
		return nil, err
	}

	return &PbDb{Pb: s}, nil

}

func (bs *PbDb) StartDBUi() error {

	err := apis.Serve(bs.Pb, apis.ServeConfig{
		ShowStartBanner: true,
		HttpAddr:        "127.0.0.1:8050",
	})

	return err

}
